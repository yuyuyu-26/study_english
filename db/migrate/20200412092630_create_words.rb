class CreateWords < ActiveRecord::Migration[5.1]
  def change
    create_table :words do |t|
      t.text :english
      t.text :japanese
      t.references :user, foreign_key: true

      t.timestamps
    end
    add_index :words, [:user_id, :created_at]
  end
end
