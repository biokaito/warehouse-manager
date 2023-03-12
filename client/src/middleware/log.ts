export default function log({ next, to }: any) {
  console.log(to.name);

  return next();
}
