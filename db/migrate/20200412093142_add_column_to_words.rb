class AddColumnToWords < ActiveRecord::Migration[5.1]
  def change
    add_column :words, :complete, :boolean, default: false, null: false
  end
end
