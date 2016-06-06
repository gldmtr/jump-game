RAND=$(shell tr -dc "[:alnum:]" < /dev/urandom | head -c 10)
CONTAINER_NAME=$(shell cat .container_info/container_name)

install:
	@read -p "Enter name of new container: " hostname; \
	container_name=vm-$$hostname-$(RAND); \
	test -d .container_info || mkdir .container_info; \
	lxc-copy -n vm -N $$container_name; \
	echo $$hostname > .container_info/hostname; \
	echo $$container_name > .container_info/container_name; \
	lxc_path=$(shell lxc-config lxc.lxcpath); \
	config_path="$$lxc_path/$$container_name/config"; \
	mv $$config_path $$config_path.bak; \
	sed "s/lxc\.utsname\s\?=\s\?.*/lxc.utsname = $$hostname/" $$config_path.bak > $$config_path; \
	echo "$(shell pwd) srv none bind,create=dir 0 0" > "$$lxc_path/$$container_name/fstab"; \
	echo "lxc.mount = $$lxc_path/$$container_name/fstab" >> $$config_path; \
	make start; \
	sudo lxc-attach -n $$container_name --clear-env -- apk update; \
	sudo lxc-attach -n $$container_name --clear-env -- apk add nodejs; \
	make stop

start:
	@sudo lxc-start -n $(CONTAINER_NAME) --logfile .container_info/logfile

console:
	@sudo lxc-console -n $(CONTAINER_NAME)

stop:
	@sudo lxc-stop -n $(CONTAINER_NAME) 

uninstall:
	@lxc-destroy -n $(CONTAINER_NAME)
	@rm -rf .container_info

test:
	@sudo lxc-attach -n $(CONTAINER_NAME) --clear-env -- /bin/ash /srv

.PHONY: test
