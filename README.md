Do not run another pip install yet. Run only these simple commands, one by one:

cd /home/ak54743
ls -l refresh_token.sh
ls -l update_token.sh
ls -l token_refresh.log

Then inspect the scripts without executing them:

sed -n '1,200p' refresh_token.sh

and:

sed -n '1,200p' update_token.sh
