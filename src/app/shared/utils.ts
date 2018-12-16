function logCount(value: boolean) {
  let count = 0;
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    if (value) {
      this.count++;
      console.log(this.count);
    }
  };
}
