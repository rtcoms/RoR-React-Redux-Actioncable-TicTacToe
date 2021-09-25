class CreateGameplayAttempts < ActiveRecord::Migration[6.1]
  def change
    create_table :gameplay_attempts do |t|
      t.references :user, null: false, foreign_key: true
      t.references :game, null: false, foreign_key: true
      t.integer :attempt_identifier

      t.timestamps
    end
  end
end
