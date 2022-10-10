import { moduleRequireLogin } from '@erxes/api-utils/src/permissions';
import { IContext } from '../../connectionResolver';

const queries = {
  async imapConversationDetail(
    _root,
    { conversationId },
    { models }: IContext
  ) {
    const messages = await models.Messages.find({
      inboxConversationId: conversationId
    });

    const convertEmails = emails =>
      (emails || []).map(item => ({ name: item.name, email: item.address }));

    return messages.map(message => {
      return {
        _id: message._id,
        mailData: {
          from: convertEmails(message.from),
          to: convertEmails(message.to),
          cc: convertEmails(message.cc),
          bcc: convertEmails(message.bcc),
          body: message.body
        }
      };
    });
  }
};

moduleRequireLogin(queries);

export default queries;
