const runSchema = (schema) => async (data) => {
    const { error, value } = await schema.validate(data);
    if (error) {
      if (error.details[0].message.includes('allowed')) {
        error.code = 400;
        error.message = 'Some required fields are missing';
        throw error;
      }
      error.code = 400;
      throw error;
    }
    return value;
  };
  
  module.exports = { runSchema };