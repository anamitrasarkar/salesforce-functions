'use strict'
import * as toxicity from '@tensorflow-models/toxicity';
/**
 * Describe Myfunction here.
 *
 * The exported method is the entry point for your code when the function is invoked. 
 *
 * Following parameters are pre-configured and provided to your function on execution: 
 * @param event: represents the data associated with the occurrence of an event, and  
 *                 supporting metadata about the source of that occurrence.
 * @param context: represents the connection to Functions and your Salesforce org.
 * @param logger: logging handler used to capture application logs and trace specifically
 *                 to a given execution of a function.
 */
 
export default async function (event, context, logger) {
    logger.info(`Invoking Myfunction with payload ${JSON.stringify(event.data || {})}`);

    // The minimum prediction confidence.
    const threshold = 0.3;
    let results = 'no data received'
    // Which toxicity labels to return.
    const labelsToInclude = ['identity_attack', 'insult', 'threat'];    
    toxicity.load(threshold, labelsToInclude)
        .then(model => {
            // Now you can use the `model` object to label sentences. 
            model.classify([event.data.message])
                .then(predictions => {
                    results = JSON.stringify(predictions)
                    logger.info(JSON.stringify(predictions))
                    if(results.length > 1) {
                        return JSON.stringify(results) 
                    }else {
                        return JSON.stringify('no preictions reported')            
                    }
                    
                })
                .catch(error => {
                    logger.info('error during classify' + error)
                })
        })    
        .catch(error => {
            logger.info('error during model load ' + error)
        })
    // results = event.data.message
    // const results = await context.org.dataApi.query('SELECT Id, Name FROM Account');
    // logger.info(JSON.stringify(results));
    // return results;
}
