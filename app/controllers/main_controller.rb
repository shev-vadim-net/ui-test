class MainController < ApplicationController
  layout 'main'

  def index
    @urls = Url.all.map{|url| url.url}
  end

  def create
    respond_to do |format|
      format.json do
        urls = params[:urls]
        result = []
        urls.each do |url|
          url_instance = Url.new(:url => url)
          result.push(url) if url_instance.save
        end unless urls.nil?
        response.headers['Content-type'] = "text/plain; charset=utf-8"
        render :text => result.to_json
      end
    end
  end
end
