require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.KEY })
  .base('appbpVqAtftHr5DT7')
  .table('assistentat-api');

exports.handler = async (event, context, cb) => {
  try {
    // const data = await airtable.list();
    const { records } = await airtable.list({
      // sort: [{ field: 'projectID', direction: 'desc' }],
      // maxRecords: 100,
    });

    const projects = records.map((project) => {
      const id = project.id;
      const { name, img, projectUrl, gitUrl, dsc } = project.fields;
      const url = img[0].url;

      return {
        name,
        url,
        projectUrl,
        gitUrl,
        dsc,
        id,
      };
    });
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: 200,
      body: JSON.stringify(projects),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'No can do amigo',
    };
  }
};
