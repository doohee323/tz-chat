USE tzchat;

DROP TABLE `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(20) DEFAULT NULL,
  `passwd` varchar(100) DEFAULT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `gender` varchar(10) NOT NULL,
  `age` int(3) NOT NULL,
  `email` varchar(50) NOT NULL,
  `region1` varchar(10) DEFAULT NULL,
  `region2` varchar(10) DEFAULT NULL,
  `meeting_type` varchar(10) DEFAULT NULL,
  `talk_style` varchar(10) DEFAULT NULL,
  `agreement` varchar(10) NOT NULL,
  `privacy` varchar(10) NOT NULL,
  `main` varchar(100) NOT NULL,
  `sub1` varchar(100) NOT NULL,
  `sub2` varchar(100) NOT NULL,
  `sub3` varchar(100) NOT NULL,
  `keyword` varchar(100) NOT NULL,
  `height` int(3) NOT NULL,
  `weight` int(3) NOT NULL,
  `blood` varchar(2) NOT NULL,
  `scholar` varchar(20) NOT NULL,
  `job` varchar(50) NOT NULL,
  `favorite` varchar(100) NOT NULL,
  `ideal` varchar(100) NOT NULL,
  `phone_no` varchar(20) NOT NULL,
  `phone_confirm` varchar(3) NOT NULL,
  `sms` varchar(3) NOT NULL,
  `part_time` varchar(20) NOT NULL,
  `message` varchar(200) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(20) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_unique` (`id`),
  UNIQUE KEY `userid_unique` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

DROP TABLE `agent`;
CREATE TABLE `agent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `agentType` varchar(45) DEFAULT NULL,
  `region1` varchar(45) DEFAULT NULL,
  `region2` varchar(45) DEFAULT NULL,
  `detail` varchar(45) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(20) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_unique` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;

DROP TABLE `talk`;
CREATE TABLE `talk` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `photo` varchar(45) DEFAULT NULL,
  `region1` varchar(45) DEFAULT NULL,
  `region2` varchar(45) DEFAULT NULL,
  `detail` varchar(45) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(20) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_unique` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

DROP TABLE `comm_cd`;
CREATE TABLE `comm_cd` (
  `comm_grp_cd` varchar(10) NOT NULL,
  `comm_cd` varchar(30) NOT NULL,
  `comm_cd_nm` varchar(300) NOT NULL,
  `order` int(3) DEFAULT NULL,
  `use_yn` varchar(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(20) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(20) NOT NULL,
  PRIMARY KEY (`comm_grp_cd`,`comm_cd`),
  UNIQUE KEY `comm_cd_unique` (`comm_grp_cd`,`comm_cd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `client_q` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `detail` varchar(4000) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(20) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_unique` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8;

CREATE TABLE `chat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` varchar(20) DEFAULT NULL,
  `target` varchar(20) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `detail` varchar(100) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(20) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_unique` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;


-- SELECT default_character_set_name FROM information_schema.SCHEMATA S WHERE schema_name = "tzchat";
-- ALTER DATABASE tzchat CHARACTER SET utf8 COLLATE utf8_general_ci;
-- CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
-- show variables like 'char%'; 

-- SELECT * FROM tzchat.comm_cd order by lvl, comm_grp_cd, sn;
-- SELECT * FROM tzchat.comm_cd
-- WHERE comm_grp_cd = '지역1';
-- SELECT * FROM tzchat.comm_cd
-- WHERE comm_grp_cd = '서울';




-- DROP TABLE at_menu;

-- menu table
CREATE TABLE at_menu (
	id int not null auto_increment,
	hgr_id int not null,							-- parent id
	menu_nm varchar(300) not null,
	menu_cd varchar(20) not null,
	menu_lvl int not null,
	array_ord int not null,				-- display order
	use_yn varchar(1) not null,
	menu_url varchar(200),				-- menu url
	menu_expl varchar(2000),			-- menu explanation
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(20) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(20) NOT NULL,
	primary key (id)
);

-- DROP TABLE at_priv;

-- privilege table
CREATE TABLE at_priv (
	id int not null auto_increment,
	priv_cd varchar(20) not null,
	priv_nm varchar(100) not null,
	priv_expl varchar(2000),			-- priv explanation
	use_yn varchar(1),
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(20) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(20) NOT NULL,
	primary key (id)
);

-- DROP TABLE at_priv_ctg_menu;

-- privilege action definition table (priv-menu, priv-button)
CREATE TABLE at_priv_ctg_menu (
	id int not null auto_increment,
	priv_cd varchar(20) not null,
	menu_cd varchar(20) not null,
	add_bttn_able_yn varchar(1) not null,	-- add
	scrn_qry_able_yn varchar(1) not null,  -- query
	sto_bttn_able_yn varchar(1) not null,  -- save
	del_bttn_able_yn varchar(1) not null,	-- delete
	dwld_bttn_able_yn varchar(1) not null,	-- download
	appr_bttn_able_yn varchar(1) not null,	-- approval
	use_yn varchar(1) not null,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(20) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(20) NOT NULL,
	primary key (id)
);

-- DROP TABLE at_priv_ctg_user;

-- user's privilege definition table
CREATE TABLE at_priv_ctg_user (
	id int not null auto_increment,
	priv_cd varchar(20) not null,
	user_id varchar(20) not null,
	priv_st_ymd varchar(8) not null,	-- priv activating date
	priv_ed_ymd varchar(8) not null,	-- priv deactivating date
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(20) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(20) NOT NULL,
	primary key (id)
);
