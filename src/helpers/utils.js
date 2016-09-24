
// This is for server side. It will dispatch all of the required data
// in this route into redux, and this is the core in server rendering.
export const dispatchFetches = (dispatch, components, params) => {
  const fetches = components
    // Filter the components which need fetch data
    .filter(component => !!component.fetches)
    // Combine fetches into an array
    .reduce((prev, next) => prev.concat(next.fetches), [])
    // Filter the repeat fetches
    .filter((value, index, self) => self.indexOf(value) === index);

  // Execute all of the actions and return a Promise object.
  return Promise.all(fetches.map(f => dispatch(f(params))));
};

// This is for client side. It will dispatch all of the required data
// in this component into redux.
export const dispatchFetch = (fetches, props) => {
  fetches.forEach(f => props.dispatch(f(props.params)));
};
