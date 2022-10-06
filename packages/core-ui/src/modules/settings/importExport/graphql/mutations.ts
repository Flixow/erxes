const exportHistoriesCreate = `
  mutation exportHistoriesCreate($contentType: String!, $columnsConfig: JSON, $segmentData: JSON) {
    exportHistoriesCreate(contentType: $contentType, columnsConfig: $columnsConfig, segmentData: $segmentData) 
  }
`;

const exportHistoriesRemove = `
  mutation exportHistoriesRemove($_id: String!, $contentType: String!) {
    exportHistoriesRemove(_id: $_id, contentType: $contentType)
  }
`;

export default {
  exportHistoriesCreate,
  exportHistoriesRemove
};
