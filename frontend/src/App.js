import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import MainNavigation from '../../frontend/src/navigation/navigation';
import {Provider, useDispatch} from 'react-redux';
import {store} from './stores/index';
import {loadToken} from './stores/user.reducer';

const AppWrapper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadToken());
  }, [dispatch]);

  return <MainNavigation />;
};

const App = () => {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
};

export default App;
