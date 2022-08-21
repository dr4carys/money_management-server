/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `ingredient` */

DROP TABLE IF EXISTS `ingredient`;

CREATE TABLE `ingredient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `color` int(11) DEFAULT NULL,
  `img` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

/*Data for the table `ingredient` */

insert  into `ingredient`(`id`,`name`,`color`,`img`) values 
(1,'kopi luwak',0,'img:1'),
(2,'kopi hitam',1,'img:2'),
(26,'ayam coklat',0,'img:www.randompath.com');

/*Table structure for table `ingredient_category` */

DROP TABLE IF EXISTS `ingredient_category`;

CREATE TABLE `ingredient_category` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `ingredient_category` */

insert  into `ingredient_category`(`id`,`parent_id`,`name`,`description`) values 
(1,1,'kopi','kumpulan kopi'),
(2,1,'ayam','kumpulan ayam');

/*Table structure for table `ingredient_category_ingredient` */

DROP TABLE IF EXISTS `ingredient_category_ingredient`;

CREATE TABLE `ingredient_category_ingredient` (
  `ingredient_category_id` int(11) DEFAULT NULL,
  `ingredient_id` int(11) DEFAULT NULL,
  KEY `ingredient_category_id` (`ingredient_category_id`),
  KEY `ingredient_id` (`ingredient_id`),
  CONSTRAINT `ingredient_category_ingredient_ibfk_2` FOREIGN KEY (`ingredient_category_id`) REFERENCES `ingredient_category` (`id`),
  CONSTRAINT `ingredient_category_ingredient_ibfk_3` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `ingredient_category_ingredient` */

insert  into `ingredient_category_ingredient`(`ingredient_category_id`,`ingredient_id`) values 
(1,1),
(1,2),
(2,26);

/*Table structure for table `recipe` */

DROP TABLE IF EXISTS `recipe`;

CREATE TABLE `recipe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `author_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `recipe_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

/*Data for the table `recipe` */

insert  into `recipe`(`id`,`name`,`description`,`author_id`) values 
(1,'kopi hitam','--',1),
(2,'kopi starbucks','--',1),
(3,'fuyung hay','--',1),
(4,'capcay','--',1),
(5,'hambaga','--',1),
(6,'fried chiken','--',1),
(15,'ayam bakar','ayam bakar bram',2),
(19,'ayam bakar','ayam bakar bram',2);

/*Table structure for table `recipe_category` */

DROP TABLE IF EXISTS `recipe_category`;

CREATE TABLE `recipe_category` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `recipe_category` */

insert  into `recipe_category`(`id`,`parent_id`,`name`) values 
(1,1,'kopi'),
(2,1,'chinese food'),
(3,2,'american food');

/*Table structure for table `recipe_category_recipe` */

DROP TABLE IF EXISTS `recipe_category_recipe`;

CREATE TABLE `recipe_category_recipe` (
  `recipe_category_id` int(11) DEFAULT NULL,
  `recipe_id` int(11) DEFAULT NULL,
  KEY `recipe_category_id` (`recipe_category_id`),
  KEY `recipe_id` (`recipe_id`),
  CONSTRAINT `recipe_category_recipe_ibfk_1` FOREIGN KEY (`recipe_category_id`) REFERENCES `recipe_category` (`id`),
  CONSTRAINT `recipe_category_recipe_ibfk_2` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `recipe_category_recipe` */

insert  into `recipe_category_recipe`(`recipe_category_id`,`recipe_id`) values 
(1,1),
(1,2),
(2,3),
(2,4),
(3,5),
(3,6);

/*Table structure for table `step` */

DROP TABLE IF EXISTS `step`;

CREATE TABLE `step` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `recipe_id` int(11) NOT NULL,
  `step_number` int(11) NOT NULL,
  `description` text NOT NULL,
  `timer` int(11) NOT NULL,
  `image` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `recipe_id` (`recipe_id`),
  CONSTRAINT `step_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

/*Data for the table `step` */

insert  into `step`(`id`,`recipe_id`,`step_number`,`description`,`timer`,`image`) values 
(1,1,1,'buka kopi',10,'sklamdlamd'),
(2,1,2,'siapin gula',5,'adsdsa'),
(3,1,3,'aduk',15,'adads'),
(4,1,4,'minum',20,'zasdads'),
(5,2,1,'buka tutup',5,'sdasad'),
(6,2,2,'minum',25,'dzsfs'),
(18,15,1,'ambil ayam',10,'http:path'),
(19,15,0,'ambil ayam',10,'http:path');

/*Table structure for table `step_ingredients` */

DROP TABLE IF EXISTS `step_ingredients`;

CREATE TABLE `step_ingredients` (
  `recipe_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL,
  `step_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `unit` varchar(25) NOT NULL,
  KEY `step_id` (`step_id`),
  KEY `ingredient_id` (`ingredient_id`),
  KEY `recipe_id` (`recipe_id`),
  CONSTRAINT `step_ingredients_ibfk_1` FOREIGN KEY (`step_id`) REFERENCES `step` (`id`),
  CONSTRAINT `step_ingredients_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`id`),
  CONSTRAINT `step_ingredients_ibfk_3` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `step_ingredients` */

insert  into `step_ingredients`(`recipe_id`,`ingredient_id`,`step_id`,`amount`,`unit`) values 
(1,1,1,10,'kmdkma'),
(1,1,2,10,'kmdkma'),
(1,1,3,10,'kmdka'),
(1,1,4,10,'asad'),
(2,2,1,10,'asd'),
(2,1,2,10,'asdsd');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`id`,`name`) values 
(1,'Stella'),
(2,'bram');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
