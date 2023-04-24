module.exports = {
  "base": {
    "output": {
      "mode": "tags",
      "client": "react-query",
      "mock": false,
      "target": "src/api/services/base/index.ts",
      "schemas": "src/api/services/base/models",
      "override": {
        "mutator": {
          "path": "src/api/instances/baseInstance.ts",
          "name": "baseInstance"
        }
      }
    },
    "input": {
      "target": "http://10.0.0.166:5001/docs-json"
    },
    "hooks": {
      "afterAllFilesWrite": "prettier --write"
    }
  }
}