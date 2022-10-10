import * as Imap from 'node-imap';
import { simpleParser } from 'mailparser';
import { generateModels } from './connectionResolver';
import { sendInboxMessage } from './messageBroker';

const listenIntegration = async (subdomain, integration) => {
  var imap = new Imap({
    user: integration.user,
    password: integration.password,
    host: integration.host,
    port: 993,
    tls: true
  });

  const searchMessages = criteria => {
    return new Promise((resolve, reject) => {
      let messages: any = [];

      imap.search(criteria, function(err, results) {
        if (err) throw err;

        let f;

        try {
          f = imap.fetch(results, { bodies: '' });
        } catch (e) {
          if (e.message.includes('Nothing to fetch')) {
            return resolve([]);
          }

          throw e;
        }

        f.on('message', function(msg, seqno) {
          var prefix = '(#' + seqno + ') ';

          msg.on('body', async function(stream, info) {
            const parsed = await simpleParser(stream);
            messages.push(parsed);
          });
        });

        f.once('error', function(err) {
          reject(err);
        });

        f.once('end', function() {
          resolve(messages);
        });
      });
    });
  };

  const saveMessages = async criteria => {
    const msgs: any = await searchMessages(criteria);

    for (const message of msgs) {
      const subject = message.subject;
      const from = message.from.value.text;
      const inReplyTo = message.replyTo;

      const apiCustomerResponse = await sendInboxMessage({
        subdomain,
        action: 'integrations.receive',
        data: {
          action: 'get-create-update-customer',
          payload: JSON.stringify({
            integrationId: integration.erxesApiId,
            firstName: from
          })
        },
        isRPC: true
      });

      const { _id } = await sendInboxMessage({
        subdomain,
        action: 'integrations.receive',
        data: {
          action: 'create-or-update-conversation',
          payload: JSON.stringify({
            integrationId: integration.erxesApiId,
            customerId: apiCustomerResponse._id,
            content: subject
          })
        },
        isRPC: true
      });

      const models = await generateModels(subdomain);

      await models.ConversationMessages.create({
        messageId: Math.random(),
        conversationId: _id,
        body: message.html
      });

      // if (inReplyTo) {
      //   const messageId = inReplyTo[0];
      //   await saveMessages([['HEADER', 'Message-ID', messageId]]);
      // }
    }
  };

  imap.once('ready', response => {
    imap.openBox('INBOX', true, async (err, box) => {
      await saveMessages(['UNSEEN', ['SINCE', 'October 4, 2022']]);
    });
  });

  imap.on('mail', function(response) {
    console.log('on mail =======', response);
  });

  // imap.once('error', function(err) {
  //   console.log(err);
  // });

  // imap.once('end', function() {
  //   console.log('Connection ended');
  // });

  imap.connect();
};

const listen = async (subdomain: string) => {
  const models = await generateModels(subdomain);
  const integrations = await models.Integrations.find();

  for (const integration of integrations) {
    await listenIntegration(subdomain, integration);
  }
};

export default listen;