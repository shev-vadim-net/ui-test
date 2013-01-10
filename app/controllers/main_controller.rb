class MainController < ApplicationController
  layout 'main'

  def index
  end

  def create
    respond_to do |format|
      format.json do
        response.headers['Content-type'] = "text/plain; charset=utf-8"
        render :text => params[:urls].to_json
      end
    end
  end
end
