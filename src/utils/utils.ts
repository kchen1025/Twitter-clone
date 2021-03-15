// this is my jank version of seeding for this project, later on should probably use something more mature
// with migrations like knex or whatever.
export const create: string = `
create table if not exists account (
  id serial primary key,
  google_id text,
  username text not null,
  email text not null,
  name text not null,
  date_of_birth date,
  added timestamptz not null default now(),
  updated timestamptz not null default now(),
  last_login timestamptz
);
create unique index unique_username on account (username);


create table if not exists tweet (
  tweet_id serial primary key,
  user_id serial not null references account(id),
  message text not null,
  added timestamptz not null default now(),
  num_favorite integer default 0
);

create table if not exists account_follow (
  id serial primary key,
  primary_user serial not null,
  following_user serial not null,
  added timestamptz not null default now()
);
create unique index user_following ON account_follow (primary_user, following_user);

create table if not exists favorite (
  id serial primary key,
  tweet_id serial not null references tweet(tweet_id),
  user_id serial not null references account(id),
  added timestamptz not null default now()
);
`;

export const seed: string = `
insert into account(username, email, name, date_of_birth) values ('kchen1025', 'kchen1025@gmail.com', 'Kevin Chen','10-25-1994');
insert into account(username, email, name, date_of_birth) values ('whatever', 'whatever@gmail.com', 'Whatever Chen','01-25-1994');
insert into account(username, email, name, date_of_birth) values ('yeet', 'yeet@gmail.com', 'yeet Chen','01-25-1994');
insert into account(username, email, name, date_of_birth) values ('cool', 'cool@gmail.com', 'cool Chen','01-25-1994');
insert into account(username, email, name, date_of_birth) values ('sick', 'sick@gmail.com', 'sick Chen','01-25-1994');

insert into tweet(user_id, message) values (1,'I hate kevin');
insert into tweet(user_id, message) values (2,'I hate kevin');
insert into tweet(user_id, message) values (3,'I hate kevin');
insert into tweet(user_id, message) values (4,'I hate kevin');
insert into tweet(user_id, message) values (5,'I hate kevin');

insert into account_follow(primary_user, following_user) values (1,2);
insert into account_follow(primary_user, following_user) values (2,1);
insert into account_follow(primary_user, following_user) values (3,1);
insert into account_follow(primary_user, following_user) values (3,3);
insert into account_follow(primary_user, following_user) values (3,4);
insert into account_follow(primary_user, following_user) values (3,5);
insert into account_follow(primary_user, following_user) values (5,2);

insert into favorite(tweet_id, user_id) values (1,1);
`;

// probably not good to keep this readily available but whatever
export const destroy: string = `
drop table if exists account_follow;
drop table if exists favorite;
drop table if exists tweet;
drop table if exists account;
`;
