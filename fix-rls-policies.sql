-- Drop old restrictive policies
drop policy if exists "users can insert own data" on public.users;
drop policy if exists "users can read own data" on public.users;
drop policy if exists "users can insert own subscriptions" on public.subscriptions;
drop policy if exists "users can read own subscriptions" on public.subscriptions;
drop policy if exists "users can insert own sessions" on public.workout_sessions;
drop policy if exists "users can read own sessions" on public.workout_sessions;

-- Users table policies
create policy "allow insert users" on public.users for insert with check (true);
create policy "allow select users" on public.users for select using (true);

-- Subscriptions table policies
create policy "allow insert subscriptions" on public.subscriptions for insert with check (true);
create policy "allow select subscriptions" on public.subscriptions for select using (true);

-- Workout sessions table policies
create policy "allow insert workout_sessions" on public.workout_sessions for insert with check (true);
create policy "allow select workout_sessions" on public.workout_sessions for select using (true);
