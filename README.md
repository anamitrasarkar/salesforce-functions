# Salesforce DX Project: Next Steps

Now that you’ve created a Salesforce DX project, what’s next? Here are some documentation resources to get you started.

## How Do You Plan to Deploy Your Changes?

Do you want to deploy a set of changes, or create a self-contained application? Choose a [development model](https://developer.salesforce.com/tools/vscode/en/user-guide/development-models).

## Configure Your Salesforce DX Project

The `sfdx-project.json` file contains useful configuration information for your project. See [Salesforce DX Project Configuration](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_config.htm) in the _Salesforce DX Developer Guide_ for details about this file.

## Read All About It

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)

## Workflow Steps
- sfdx auth:web:login -d -a dev-hub-alias
- sf login
- sf login functions
- sf generate project -n project-name
- NOTE: Before create a scratch org ensure you have ["Functions"] in project-scratch-def.json
- sfdx force:org:create -s -f config/project-scratch-def.json -a scratch-org-alias
- sf env create compute -o scratch-org-alias -a compute-env-alias
- sf generate function -n myfunction -l javascript
- NOTE: git status, git add ., git commit -m "commit statement"
- sf deploy functions -o scratch-org-alias
If you have written any apex code, then use the following script to push code to scratch org
- sfdx force:source:push -u scratch-org-alias
At this point you can login to your scratch org to invoke the apex via apex debug window.

### Thank you,
