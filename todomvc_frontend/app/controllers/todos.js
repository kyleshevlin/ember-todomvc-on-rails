import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createTodo: function() {
      // Get the title from the new-todo input
      var title = this.get('newTitle');
      if ( !title.trim() ) { return; }

      // Create the new todo model
      var todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      });

      // clear title field
      this.set('newTitle', '');

      // Save the new model
      todo.save();
    }
  },

  remaining: Ember.computed('model.@each.isCompleted', function() {
    var todos = this.get('model');
    return todos.filterBy('isCompleted', false).get('length');
  }).property('model.@each.isCompleted'),

  inflection: function() {
    var remaining = this.get('remaining');
    return remaining === 1 ? 'todo' : 'todos';
  }.property('remaining')
});
