1. Promise
# The Promise object is used for asynchronous computations. A Promise represents a value which may be available now, or in the future, or never.
2. then()
# The then() method returns a Promise. It takes up to two arguments: callback functions for the success and failure cases of the Promise.
3. Reality
#  Component shouldn’t include logic to fetch data, and data shouldn’t be stored in a component’s  state
4. Modify state
# The only way to modify the state is through emitting an action, which is an object that describes what should change. Action Creators are the functions that are dispatched to emit a change – all they do is return an action.
5. Reducers
# When an action is dispatched, a Reducer is the function that actually changes the state appropriate to that action – or returns the existing state if the action is not applicable to that reducer. Reducers are “pure functions”. They should not have any side-effects nor mutate the state — they must return a modified copy.
6. Actions and Actions Creators
# We have 5 properties in register state tree, hence we need 5 unique actions creators, but we'll probably need more actions that combines that four unique actions, and this is the difference between action creators and actions that we need in our app.
7. Action Creators
# Action creators are functions that return an action.
8. Asynchronous actions
# Redux action creators don’t support asynchronous actions like fetching data, so here’s where we utilise Redux Thunk. Thunk allows you to write action creators that return a function instead of an action. The inner function can receive the store methods dispatch and getState as parameters.
9. Reducers returns
# If the action.type matches, then we return the relevant property of action. As mentioned earlier, the type and action[propertyName] is what was defined in your action creators.
