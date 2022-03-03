const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : 'Somisingh@20',
      database : 'hotel'
    }
});
// customers table
knex.schema.hasTable("customers").then(function (exists) {
  if (!exists) {
    return knex.schema.createTable("customers", function (table) {
      table.increments("cid").primary();
      table.string("cname");
      table.string("cemail");
    })
  }
}).then((data) =>{
  // console.log(data);
  console.log("table has created");
}).catch((err) =>{
  console.log(err);
  console.log("table can not creat");
});
// orders table
knex.schema.hasTable("orders").then(function (exists) {
  if (!exists) {
    console.log("orders table has created");
      return knex.schema.createTable("orders", function (table) {
          table.increments("oid").primary();
          table.integer("orderdate");
          table.integer("oamount");
      })
  }
}).then((data) =>{
  // console.log(data);
  console.log("table has created");
}).catch((err) =>{
  console.log(err);
  console.log("table can not creat");
});

module.exports = knex;