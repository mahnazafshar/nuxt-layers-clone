import config from './config.mjs';
import  JsonToTS from "json-to-ts";
const parseField = (field) => {
    const dataArray = field.split(" ");
    return {
      attribute: dataArray[0],
      isRequired: dataArray[1] === "required" || dataArray[1] === "r",
    };
  };

export default function(/** @type {import('plop').NodePlopAPI} */ plop){
  plop.setHelper('upperCase', (txt) => txt.toUpperCase());
    plop.setHelper("parseFields", (fields) => {
        const dataArray = fields.split(",");
        return dataArray.map((item) => {
         return parseField(item);
        });
      });
      plop.setHelper("interfaceFromJson", function (jsonString, rootInterfaceName) {
        // try {
        
          return JsonToTS(
           JSON.parse(jsonString)
          )
            .join("\n")
            .replace("RootObject", rootInterfaceName);
        // } catch {
        //   throw new Error(
        //     "make sure you have the json file in this path: plop-templates/json/" +
        //       jsonFileName +
        //       ".json"
        //   );
        // }
      });
    
      plop.setGenerator("interface", {
        description: "create an interface for my app",
        prompts: [
          {
            type: "input",
            name: "name",
            message: "name of your module you want generate interface for it?",
          },
          {
            type: "input",
            name: "json",
            message: "json?",
          },
        ],
        actions: [
          {
            type: "add",
            path: 
              config.logicPath+"/composables/{{camelCase name}}/{{pascalCase name}}.interface.ts",
              templateFile: "plop-templates/interface.hbs",
          },
        ],
      });

    plop.setGenerator("validator",{
        description: "generate validator",
        prompts:[
            {type:'input',name: 'name' ,"message":"name of your module you want generate validator for it?"},
            {
                type: "input",
                name: "fields",
                message: "enter fields separate with ',' (name r,code,...)",
           },
        ],
        actions: [
            {
              type: "add",
              path: config.logicPath+"/composables/{{camelCase name}}/{{pascalCase name}}.validator.ts",
              templateFile: "plop-templates/validator.hbs",
            },
          ],
    })

    plop.setGenerator("service",{
      description: "generate validator",
      prompts:[
          {type:'input',name: 'name' ,"message":"name of your module you want generate service for it?"},
      ],
      actions: [
          {
            type: "add",
            path: config.logicPath+"/composables/{{camelCase name}}/{{pascalCase name}}.service.ts",
            templateFile: "plop-templates/service.hbs",
          },
        ],
  })
}