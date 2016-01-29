require 'json'

ITEMS = methods.map.with_index do |word, i|
  {
    id: i,
    word: word.to_s,
  }
end

class App
  def self.call(env)

    sleep 1
    items = ITEMS.sample(2 + rand(3))

    return [200, {
      'Content-Type' => 'application/json',
      'Access-Control-Allow-Origin' => '*',
    }, [items.to_json]];
  end
end

run App

