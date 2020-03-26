class DeviseCreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table(:users) do |t|
      ## Database authenticatable
      t.string :username,              null: false, default: ""
      t.string :password, null: false, default: ""
    end

    add_index :users, :username, unique: true

  end
end
