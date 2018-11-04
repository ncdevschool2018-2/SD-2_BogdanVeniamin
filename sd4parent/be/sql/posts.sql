create table `post` (
  `id` bigint(20) not null auto_increment,
  `title` varchar(45) default null,
  `description` varchar(255) default null,
  `price` float default null,
  `discount` int default null,
  `additions_id` enum default null,
  primary key (`id`),
  unique key `title_unique` (`title`)
) ENGINE=InnoDB auto_increment=1

create table `user` (
  `id` bigint(20) not null auto_increment,
  `login` varchar(45) default null,
  `password` varchar(45) not null,
  `role` varchar(45) default null,
  `email` varchar(45) not null,
  `language` boolean default true, /* language=0 - english, language=1 - russian */
  `last_date_login` timestamp,
  primary key (`id`),
  unique key `login_unique` (`login`)
) ENGINE=InnoDB auto_increment=1

create table `wallet` (
  `id` bigint(20) not null auto_increment,
  `owner_id` bigint(20) not null,
  `transactions_id` enum default null,
  `money` float default null,
  primary key (`id`),
  foreign key (`owner_id`) references `user`(`id`),
  foreign key (`transactions_id`) references `transactions`(`id`)
) ENGINE=InnoDB auto_increment=1

create table `usersposts` (
  `user_id` bigint(20) not null,
  `post_id` bigint(20) not null,
  `duration` int,
  foreign key (`user_id`) references `user`(`id`),
  foreign key (`post_id`) references `post`(`id`)
)

create table `packages` (
  `id` bigint(20) not null auto_increment,
  `posts_id` enum default null,
  primary key (`id`),
  foreign key (`posts_id`) references `post`(`id`)
) ENGINE=InnoDB auto_increment=1

create table `addition` (
  `id` bigint(20) not null auto_increment,
  `title` varchar(45) default null,
  `description` varchar(255) default null,
  `price` float default null,
  primary key (`id`)
) ENGINE=InnoDB auto_increment=1

create table `additionsposts` (
  `post_id` bigint(20) not null,
  `addition_id` bigint(20)  not null,
  foreign key (`post_id`) references `post`(`id`),
  foreign key (`addition_id`) references `addition`(`id`)
)

create table `transactions` (
  `id` bigint(20) not null auto_increment,
  `action` enum default null,
  `amount` float default null,
  primary key (`id`)
) ENGINE=InnoDB auto_increment=1