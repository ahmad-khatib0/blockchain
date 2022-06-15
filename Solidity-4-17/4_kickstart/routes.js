const routes = require("next-routes")();

routes
  .add("/campaigns/new", "campaigns/new")
  .add("/campaigns/:address", "/campaigns/show")
  // the second arg is what component do you want to show ,
  .add("/campaigns/:address/requests", "/campaigns/requests/index")
  .add("/campaigns/:address/requests/new", "/campaigns/requests/new");
module.exports = routes;
