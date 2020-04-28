class Word
  
  def initialize(english:, japanese:)
    @english = english
    @japanese = japanese
  end
  
  def practice
    "#{@english} #{@japanese}"
  end
  
end