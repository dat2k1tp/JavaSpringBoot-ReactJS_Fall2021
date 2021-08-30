-- drop database Java6
create database java6;
use java6;

-- Thoi gian tu dong tang
-- nvarchar ko co trong mysql -> VARCHAR(n) CHARSET utf8
create table categories(
	id int unsigned not null auto_increment,
    name varchar(255) not null,
    deleted_at tinyint not null default 0,
    constraint PK_Categories primary key(id)
);

create table accounts(
	id int unsigned not null auto_increment,
	username varchar(255) unique not null,
    password varchar(255) not null,
    name varchar(255) not null,
    email varchar(255) not null unique,
    photo varchar(255) not null,
    deleted_at  tinyint not null default 0,
    constraint PK_Accounts primary key(id)
);

create table products(
	id int unsigned not null auto_increment,
	name varchar(255) not null,
    image varchar(255) not null,
    price float not null,
    create_date timestamp default current_timestamp,
    available int not null,
    category_id int unsigned not null,
    deleted_at tinyint not null default 0,
    constraint PK_Products primary key(id)
);

create table orders(
	id int unsigned not null auto_increment,
	account_id int unsigned not null,
    create_date timestamp default current_timestamp,
    address varchar(1000) not null,
    telephone varchar(15) not null,
    status tinyint not null default 0,
	deleted_at tinyint not null default 0,
    constraint PK_Orders primary key(id)
);

create table order_details(
	id int unsigned not null auto_increment,
    order_id int unsigned not null,
	product_id int unsigned not null,
    price float not null,
    quantity int not null,
    constraint PK_OrderDetails primary key(id)
);

create table roles(
	id varchar(20) unique not null,
    name varchar(255) not null,
    constraint PK_Roles primary key(id)
);

create table authorities(
	id int unsigned auto_increment not null,
    account_id  int unsigned not null,
    role_id varchar(20) not null,
    constraint PK_Authorities primary key(id)
);



alter table products
add constraint FK_Products_Categories foreign key(category_id) references categories(id);

alter table orders
add constraint FK_Orders_Accounts foreign key(account_id) references accounts(id);

alter table authorities
add constraint FK_Authorities_Roles foreign key(role_id) references roles(id);

alter table authorities
add constraint FK_Authorities_Accounts foreign key(account_id) references accounts(id);

alter table order_details
add constraint FK_OrderDetails_Orders foreign key(order_id) references orders(id);

alter table order_details
add constraint FK_OrderDetails_Products foreign key(product_id) references products(id);




