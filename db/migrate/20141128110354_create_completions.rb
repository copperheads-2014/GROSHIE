class CreateCompletions < ActiveRecord::Migration
  def change
    create_table :completions do |t|
      t.integer :survey_id
      t.integer :responder_id
      t.datetime :started_at
      t.datetime :ended_at

      t.timestamps
    end
  end
end
