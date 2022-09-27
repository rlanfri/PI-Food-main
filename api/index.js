//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, DietType } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  console.log('Database synced successfully');
  server.listen(process.env.PORT, () => {
    console.log('Server listening at 3001'); // eslint-disable-line no-console
  })
}
)
 
/*   let glutenFree = DietType.findOrCreate({
    where: {
      name: 'Gluten Free'
    ,}
});
  let ketogenic = DietType.findOrCreate({
    where: {
      name: 'Ketogenic'
    ,}
});
  let lactoOvoVegetarian = DietType.findOrCreate({
    where: {
      name: 'Lacto Ovo Vegetarian'
    ,}
});
  let paleolithic = DietType.findOrCreate({
    where: {
      name: 'Paleolithic'
    ,}
});
  let pescetarian = DietType.findOrCreate({
    where: {
      name: 'Pescetarian'
    ,}
});
  let primal = DietType.findOrCreate({
    where: {
      name: 'Primal'
    ,}
});
  let vegan = DietType.findOrCreate({
    where: {
      name: 'Vegan'
    ,}
});
  let dairyFree = DietType.findOrCreate({
    where: {
      name: 'Dairy Free'
    ,}
});
  let fodmapFriendly = DietType.findOrCreate({
    where: {
      name: 'Fodmap Friendly'
    ,}
});
  let Whole30 = DietType.findOrCreate({
    where: {
      name: 'Whole 30'
    ,}
}); */
/* 
Promise.all([glutenFree, ketogenic, lactoOvoVegetarian, paleolithic, pescetarian, primal, vegan, dairyFree, fodmapFriendly, Whole30]).then(() => {
  console.log ('Diet types created');
})
});  
 */
