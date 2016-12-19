import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';

const PlaceholderForRoutes = () => {
    return <div>hey dude</div>
}
export default (
    <Route path="/" component={App}>
        <Route path="ChampionSelect" component={PlaceholderForRoutes} />
    </Route>
);
