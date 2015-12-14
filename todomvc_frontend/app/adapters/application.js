import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: 'api/v1',

  // http://stackoverflow.com/questions/31016676/deprecation-the-default-behavior-of-shouldreloadall-will-change-in-ember-data-2
  shouldReloadAll: function(store, snapshot) {
    return !store.peekAll( snapshot.type.modelName ).length;
  }
});
