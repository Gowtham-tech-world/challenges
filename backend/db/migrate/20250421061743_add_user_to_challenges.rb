class AddUserToChallenges < ActiveRecord::Migration[8.0]
  def up
    add_reference :challenges, :user, null: true, foreign_key: true

    # Assign existing challenges to an existing user (like the first one)
    default_user = User.first
    raise "No users found! Can't assign default user." unless default_user

    Challenge.update_all(user_id: default_user.id)

    # Now add NOT NULL constraint
    change_column_null :challenges, :user_id, false
  end

  def down
    remove_reference :challenges, :user
  end
end

