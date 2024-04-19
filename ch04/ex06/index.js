function resize1(params) {
  let maxWidth = 600;
  let maxHeight = 480;
  console.log(params);
  // &&を使う
  params && params.maxWidth && (maxWidth = params.maxWidth);
  // ||を使う
  !params || !params.maxHeight || (maxHeight = params.maxHeight);
  console.log({ maxWidth, maxHeight });
}

function resize2(params) {
  let maxWidth = 600;
  let maxHeight = 480;

  maxWidth = params?.maxWidth ?? maxWidth;
  maxHeight = params?.maxHeight ?? maxHeight;
  console.log({ maxWidth, maxHeight });
}
resize1({});
resize1({ maxWidth: undefined, maxHeight: undefined });
resize1({ maxWidth: 300, maxHeight: 400 });
resize1({ maxWidth: 1500, maxHeight: 1700 });

resize2({});
resize2({ maxWidth: undefined, maxHeight: undefined });
resize2({ maxWidth: 300, maxHeight: 400 });
resize2({ maxWidth: 1500, maxHeight: 1700 });
