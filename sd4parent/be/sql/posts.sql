create table `post` (
  `id` bigint(20) not null auto_increment,
  `title` varchar(45) default null,
  `description` varchar(255) default null,
  `price` float default null,
  `discount` int default null,
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
