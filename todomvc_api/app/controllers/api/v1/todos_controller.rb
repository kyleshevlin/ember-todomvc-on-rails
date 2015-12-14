class Api::V1::TodosController < ApplicationController
  before_action :set_todo, only: [:show, :update, :destroy]

  # GET /api/v1/todos
  # GET /api/v1/todos.json
  def index
    @todos = Todo.all

    render json: @todos
  end

  # GET /api/v1/todos/1
  # GET /api/v1/todos/1.json
  def show
    render json: @todo
  end

  # POST /api/v1/todos
  # POST /api/v1/todos.json
  def create
    @todo = Todo.new(todo_params)

    if @todo.save
      render json: @todo, status: :created
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/todos/1
  # PATCH/PUT /api/v1/todos/1.json
  def update
    @todo = Todo.find(params[:id])

    if @todo.update(todo_params)
      head :no_content
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/todos/1
  # DELETE /api/v1/todos/1.json
  def destroy
    @todo.destroy

    head :no_content
  end

  private

    def set_todo
      @todo = Todo.find(params[:id])
    end

    def todo_params
      params.require(:todo).permit(:title, :isCompleted)
    end
end
