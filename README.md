webflow =    https://corin-vale.webflow.io/


Portfolio

dark-primary = #121212
dark-secondary =  #2a2a2a
dark-tertiary = #595959
light-primary = #f9f5ec
Light-secondary = #е5d4b0
Brand-0    =  #ffc447
Brand-1  = #e6ae1e
Brand-dark-2 = #C78100
Transparent =  rgba(255, 255, 255, 0)



gradiend : 
background: "linear-gradient(135deg, #f5b544 0%, #C78100 50%, #8b540a 100%)"


# To build Static: 
npm ci
npm run build:static


black background - oklch(0.182 0 90)

dark grey - oklch(0.285 0 0)


# fresh, reproducible install
rm -rf node_modules package-lock.json
npm install
npm run dev

# run lint
npm run lint


### Contact Form
If you want the form to hit a real endpoint, 
I can add a tiny /app/api/contact/route.ts that validates inputs with zod, rate-limits by IP, 
and sends an email via your provider (Resend/Sendgrid) — all wired to this component.




### git 
git rm --cached pnpm-lock.yaml
git commit -m "Use npm only; remove pnpm-lock"
git push

git add .github/workflows/deploy.yml
git commit -m "Add deploy workflow"
git push origin main



# commands
rm -rf .next out
npm ci      
npm run build