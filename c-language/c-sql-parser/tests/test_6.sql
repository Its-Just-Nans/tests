(
    SELECT habit,
        pigeon
    FROM habit
    WHERE habit.user_id = user_id
)