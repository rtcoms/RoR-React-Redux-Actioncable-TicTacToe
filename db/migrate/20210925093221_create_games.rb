class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.references :player_1, null: false, foreign_key: { to_table: :users}
      t.references :player_2, null: false, foreign_key: { to_table: :users}

      t.timestamps
    end
  end
end
