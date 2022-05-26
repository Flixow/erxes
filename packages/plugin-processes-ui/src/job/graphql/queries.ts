import { queries as productQueries } from '@erxes/ui-products/src/graphql';

const productFields = productQueries.productFields;

const productCategories = productQueries.productCategories;

const products = productQueries.products;

const jobRefersParamsDef = `$page: Int, $perPage: Int, $categoryId: String, $searchValue: String`;
const jobRefersParams = `page: $page, perPage: $perPage, categoryId: $categoryId, searchValue: $searchValue`;

const jobRefersFields = `
_id
createdAt
code
name
type
status
duration
durationType
needProducts
resultProducts
      `;

const jobCategoryFields = `
      _id
      createdAt
      name
      code
      order
      description
      parentId
      status
      `;

const productsCount = `
  query productsTotalCount($type: String) {
    productsTotalCount(type: $type)
  }
`;

const productCountByTags = `
  query productCountByTags {
    productCountByTags
  }
`;

const productCategoriesCount = `
  query productCategoriesTotalCount {
    productCategoriesTotalCount
  }
`;

const productDetail = `
  query productDetail($_id: String) {
    productDetail(_id: $_id) {
      ${productFields}
      customFieldsData
    }
  }
`;

const productCategoryDetail = `
  query productCategoryDetail($_id: String) {
    productCategoryDetail(_id: $_id) {
      _id
      name
      productCount
    }
  }
`;

// JOB

const jobRefers = `
query jobRefers(${jobRefersParamsDef}) {
  jobRefers(${jobRefersParams}) {
    ${jobRefersFields}
  }
}
`;

const jobReferTotalCount = `
query jobReferTotalCount($categoryId: String, $searchValue: String) {
  jobReferTotalCount(categoryId: $categoryId, searchValue: $searchValue)
}
`;

const jobReferDetail = `
  query jobReferDetail($id: String!) {
  jobReferDetail(_id: $id) {
    ${jobRefersFields}
  }
}
`;

const jobCategories = `
query jobCategories($status: String) {
  jobCategories(status: $status) {
      ${jobCategoryFields}
    }
  }
`;

const jobCategoriesTotalCount = `
  query jobCategoriesTotalCount {
    jobCategoriesTotalCount
  }
`;

// UOM

const uoms = productQueries.uoms;

const uomsTotalCount = `
query uomsTotalCount {
  uomsTotalCount
}
`;

// Settings

const productsConfigs = productQueries.productsConfigs;

export default {
  products,
  productDetail,
  productCountByTags,
  productsCount,
  productCategories,
  productCategoriesCount,
  productCategoryDetail,

  uoms,
  uomsTotalCount,

  productsConfigs,

  jobRefers,
  jobReferDetail,
  jobReferTotalCount,
  jobCategories,
  jobCategoriesTotalCount
};
