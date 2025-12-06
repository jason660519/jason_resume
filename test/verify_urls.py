
import re
import os

# Define the standardized URLs for key items to check consistency
standardized_urls = {
    "TED": "https://www.ted.com/profiles/4949633/translator",
    "GCP_Certificate": "https://jason660519.github.io/jason_resume/assets/img/certificates/google_cloud_certified_professional_cloud_architect.jpg",
    "Terraform_Certificate": "https://jason660519.github.io/jason_resume/assets/img/certificates/terraform_certified_associate.jpg",
    "GitHub_Actions_Certificate": "https://jason660519.github.io/jason_resume/assets/img/certificates/github_actions_certification.jpg",
    "Facebook": "https://www.facebook.com/profile.php?id=1061788626",
    "LinkedIn": "https://linkedin.com/in/yifan-yu-3162902ab/",
    "Line": "https://line.me/ti/p/gdG9RvXupT",
    "GitHub_Profile": "https://github.com/jason660519"
}

files_to_check = [
    "index.html",
    "index-en.html",
    "index-zh.html",
    "index-zh-hans.html",
    "certificates.html"
]

def check_file(filename):
    print(f"Checking {filename}...")
    if not os.path.exists(filename):
        print(f"  Error: File {filename} not found.")
        return

    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
        
        # Find all href attributes using regex
        # Matches href="value" or href='value'
        hrefs = re.findall(r'href=["\']([^"\']+)["\']', content)
        
        errors = []
        
        for href in hrefs:
            if not href:
                continue
            
            # Ignore local anchors
            if href.startswith("#"):
                continue
                
            # Check 1: Protocol (HTTP vs HTTPS)
            if href.startswith("http://"):
                errors.append(f"Insecure HTTP link found: {href}")
                
            # Check 2: Tracking parameters
            if "utm_" in href or "fbclid" in href:
                errors.append(f"Tracking parameter found: {href}")
                
            # Check 3: Specific standardized URLs
            # TED
            if "ted.com" in href:
                if href != standardized_urls["TED"]:
                    errors.append(f"Non-standard TED link: {href}")
            
            # GCP Certificate (check if it points to the old path or new JPG)
            if "GCP_Architect_Certificate" in href:
                 errors.append(f"Old GCP Certificate link found (should be JPG): {href}")
            
            # CCIM Data Structure link (should be removed)
            # Need to check context for this one, regex is harder without context.
            # But we can check if the specific CCIM link exists at all, which is https://www.ccim.com/
            # And if it appears more times than expected? 
            # Actually, checking the link itself is enough if we know it shouldn't be there for "Data Structure".
            # But the link https://www.ccim.com/ is VALID for the actual CCIM item.
            # So we can't just flag the URL. We need context.
            # We can verify if the text "Data structure" or "資料結構" is followed by this link.
            pass

        # Contextual check for Data Structure link
        # Check if "Data structure" (or variants) is INSIDE an anchor tag pointing to CCIM
        # This is the specific error we want to catch.
        # Pattern: <a href="...ccim...">...Data structure...</a>
        
        # Note: Regex for HTML is tricky, but we can try a reasonable approximation for this specific case.
        # We look for the specific href, then check if the content inside that tag includes the forbidden keywords.
        
        ccim_matches = re.finditer(r'<a[^>]+href=["\']https://www\.ccim\.com/["\'][^>]*>(.*?)</a>', content, re.IGNORECASE | re.DOTALL)
        for match in ccim_matches:
            link_text = match.group(1)
            if re.search(r'(Data structure|資料結構|数据结构)', link_text, re.IGNORECASE):
                errors.append("Incorrect CCIM link for Data Structure found (link still exists)")

        if not errors:
            print("  All checks passed.")
        else:
            for err in errors:
                print(f"  [FAIL] {err}")

print("Starting URL Verification...")
for f in files_to_check:
    check_file(f)
