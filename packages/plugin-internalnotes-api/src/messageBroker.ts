import { serviceDiscovery } from './configs';
import { generateModels } from './connectionResolver';

const checkService = async (serviceName: string, needsList?: boolean) => {
  const enabled = await serviceDiscovery.isEnabled(serviceName);

  if (!enabled) {
    return needsList ? [] : null;
  }

  return;
};

let client;

export const initBroker = async (cl) => {
  client = cl;

  const { consumeQueue, consumeRPCQueue } = cl;

  consumeQueue(
    'internalNotes:batchUpdate',
    async ({ subdomain, contentType, oldContentTypeIds, newContentTypeId }) => {
      const models = await generateModels(subdomain);
      // Updating every internal notes of company
      await models.InternalNotes.updateMany(
        {
          contentType,
          contentTypeId: { $in: oldContentTypeIds || [] },
        },
        { contentTypeId: newContentTypeId }
      );
    }
  );

  consumeRPCQueue(
    'internalnotes:rpc_queue:getInternalNotes',
    async ({ subdomain, contentTypeIds, perPageForAction, page }) => {
      const filter = { contentTypeId: { $in: contentTypeIds } };
      const models = await generateModels(subdomain);
      const internalNotes = await models.InternalNotes.find(filter)
        .sort({
          createdAt: -1,
        })
        .skip(perPageForAction * (page - 1))
        .limit(perPageForAction);

      return {
        internalNotes,
        totalCount: await models.InternalNotes.countDocuments(filter),
      };
    }
  );

  consumeQueue(
    'internalnotes:InternalNotes.removeInternalNotes',
    async ({ subdomain, contentType, contentTypeIds }) => {
      const models = await generateModels(subdomain);
      models.InternalNotes.removeInternalNotes(contentType, contentTypeIds);
    }
  );
};

export const sendNotificationMessage = async (
  action,
  data,
  isRPC?: boolean,
  defaultValue?
): Promise<any> => {
  if (isRPC) {
    if (!(await serviceDiscovery.isEnabled('notifications'))) {
      return defaultValue;
    }

    return client.sendRPCMessage(`notifications:${action}`, { data });
  }

  return client.sendMessage(`notifications:${action}`, { data });
};

export const sendRPCMessage = async (channel, message): Promise<any> => {
  return client.sendRPCMessage(channel, message);
};

export const findItem = async (data) => {
  const [serviceName] = data.contentType.split(':');

  await checkService(serviceName, false);

  return client.sendRPCMessage(`${serviceName}:rpc_queue:findItem`, data);
};

export const getContentIds = async (data) => {
  const [serviceName] = data.contentType.split(':');

  await checkService(serviceName, true);

  return client.sendRPCMessage(`${serviceName}:logs:getContentIds`, data);
};

export default function() {
  return client;
}
