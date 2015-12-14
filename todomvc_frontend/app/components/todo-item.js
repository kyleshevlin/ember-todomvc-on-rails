import Ember from 'ember';

export default Ember.Component.extend({
  // Define the element
  tagName: 'li',
  classNames: ['todo-item'],
  classNameBindings: ['isCompleted:is-completed', 'isEditing:is-editing'],

  // Properties
  isEditing: false,

  isCompleted: Ember.computed({
    get: function() {
      var item = this.get('item');
      return item.get('isCompleted');
    },
    set: function(key, value) {
      var item = this.get('item');
      item.set('isCompleted', value);
      item.save();
      return value;
    }
  }).property('isCompleted'),

  actions: {
    acceptChanges: function() {
      this.set('isEditing', false);

      var item = this.get('item');
      var title = item.get('title');

      if ( title.length ) {
        item.set('title', title);
        item.save();
      } else {
        this.set('isEditing', true);
      }
    },

    deleteTodo: function() {
      this.get('item').destroyRecord();
    },

    editTodo: function() {
      this.set('isEditing', true);
    },

    toggleCompleted: function() {
      console.log('toggleCompleted');
    }.property('this.isCompleted')
  },

  didInsertElement: function() {
    this.$('.todo-item-edit').focus();
  }
});
