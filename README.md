# Fastify OAS Problem Sample

this repo demonstrates a problem with `fastify-oas` where the generated yaml is not valid.

To replicate

1. `yarn install`
2. `node index.js`
3. go to http://localhost:3000/api/documentation/yaml
4. copy the yaml and paste it into https://editor.swagger.io/
5. the following errors will appear

```
Structural error at paths./api/users.get.responses.200.content.application/json.schema.properties.data.items
should NOT have additional properties
additionalProperty: $id
Jump to line 53
Structural error at paths./api/users.get.responses.default
should have required property 'description'
missingProperty: description
Jump to line 61
 
```