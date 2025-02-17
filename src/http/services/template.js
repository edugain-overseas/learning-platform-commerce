import { privateRoutesHandler } from "../privateRoutesHandler";

export const getAllTemplates = async () => {
  try {
    const response = await privateRoutesHandler("get", "template/get/all");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getTemplateByIdAndType = async (id, type) => {
  try {
    const response = await privateRoutesHandler(
      "get",
      `template/get/${type}/${id}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createTemplateByType = async (type, data) => {
  const requestData = {...data, template_data : data.template_data.map(attr=>{
    if (attr.a_type === 'table') {
      return {
        ...attr,
        table_data: JSON.stringify(attr.table_data)
      }
    }
    return attr
  })}

  try {
    const response = await privateRoutesHandler(
      "post",
      `template/create/${type}`,
      requestData
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTemplateById = async (id) => {
  try {
    const response = await privateRoutesHandler(
      "delete",
      `template/delete/${id}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
