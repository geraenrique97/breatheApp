export const commons = {
  centeredLayout: {justifyContent: 'center', alignItems: 'center'},
  boxSize: (h, w, borderRadius) => ({
    height: h,
    width: w,
    ...(borderRadius && {borderRadius}),
  }),
  fillAvailableSpace: {flex: 1},
};
