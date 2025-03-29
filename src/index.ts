import app from './server';

const port = 9001;

console.log("STRAT")

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
