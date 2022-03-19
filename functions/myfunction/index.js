"use strict"
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
    const threshold = 0.9;
    // Which toxicity labels to return.
    const labelsToInclude = ['identity_attack', 'insult', 'threat'];    
    toxicity.load(threshold, labelsToInclude)
        .then(model => {
            // Now you can use the `model` object to label sentences. 
            model.classify(['you suck'])
                .then(predictions => {
                    logger.info(JSON.stringify(predictions))
                    return JSON.stringify(predictions)            
                })
                .catch(error => {
                    logger.info('error during classify' + error)
                })
        })    
        .catch(error => {
            logger.info('error during model load ' + error)
        })

    // const results = await context.org.dataApi.query('SELECT Id, Name FROM Account');
    // logger.info(JSON.stringify(results));
    // return results;
}
