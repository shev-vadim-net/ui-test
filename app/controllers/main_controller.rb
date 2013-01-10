class MainController < ApplicationController
  layout 'main'

  def index
  end

  def create
    respond_to do |format|
      format.json do
        urls = params[:urls]
        result = []
        urls.each do |url|
          url_instance = Url.new(:url => url)
          result.push({:url => url, :saved => true}) if url_instance.save
        end
        response.headers['Content-type'] = "text/plain; charset=utf-8"
        render :text => result.to_json
      end
    end
  end
end
