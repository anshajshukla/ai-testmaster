#!/usr/bin/env python3

import os
import sys
import json
import argparse
import xmltodict
from datetime import datetime
import requests
from dotenv import load_dotenv
import markdown

def load_test_results(log_file):
    """Load and parse test results from XML file."""
    try:
        with open(log_file, 'r') as f:
            return xmltodict.parse(f.read())
    except Exception as e:
        print(f"Error loading test results: {e}")
        sys.exit(1)

def analyze_failure(test_case):
    """Analyze a test failure using Hugging Face's free model."""
    prompt = f"""
    Here is a test failure log:
    
    Test Name: {test_case.get('@name', 'Unknown')}
    Failure Message: {test_case.get('failure', {}).get('#text', 'No message')}
    Error Type: {test_case.get('failure', {}).get('@type', 'Unknown')}
    
    Please analyze this test failure and provide:
    1. Root cause analysis
    2. Suggested fix
    3. Best practices to prevent similar issues
    
    Format the response in markdown.
    """
    
    try:
        # Using Hugging Face's free inference API with a suitable model
        API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"
        headers = {"Content-Type": "application/json"}
        
        payload = {
            "inputs": prompt,
            "parameters": {
                "max_new_tokens": 500,
                "temperature": 0.7,
                "top_p": 0.95,
                "return_full_text": False
            }
        }
        
        response = requests.post(API_URL, headers=headers, json=payload)
        response.raise_for_status()
        
        # Extract the generated text from the response
        result = response.json()
        if isinstance(result, list) and len(result) > 0:
            return result[0].get('generated_text', 'No analysis available')
        return 'No analysis available'
    except Exception as e:
        return f"Error analyzing failure: {str(e)}"

def generate_report(test_results, analysis_results):
    """Generate an HTML report from test results and analysis."""
    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    report_file = f"reports/test_analysis_{timestamp}.html"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Test Failure Analysis Report</title>
        <style>
            body {{ font-family: Arial, sans-serif; margin: 40px; }}
            .failure {{ background-color: #fff3f3; padding: 20px; margin: 10px 0; border-left: 4px solid #ff4444; }}
            .analysis {{ background-color: #f8f9fa; padding: 20px; margin: 10px 0; border-left: 4px solid #007bff; }}
            h1, h2 {{ color: #333; }}
            pre {{ background-color: #f8f9fa; padding: 10px; overflow-x: auto; }}
        </style>
    </head>
    <body>
        <h1>Test Failure Analysis Report</h1>
        <p>Generated on: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}</p>
    """
    
    for test_case, analysis in analysis_results.items():
        html_content += f"""
        <div class="failure">
            <h2>Test Case: {test_case}</h2>
            <pre>{test_results.get('failure', {}).get('#text', 'No message')}</pre>
        </div>
        <div class="analysis">
            <h3>AI Analysis:</h3>
            {markdown.markdown(analysis)}
        </div>
        """
    
    html_content += """
    </body>
    </html>
    """
    
    os.makedirs("reports", exist_ok=True)
    with open(report_file, "w") as f:
        f.write(html_content)
    
    return report_file

def main():
    parser = argparse.ArgumentParser(description="AI-powered test failure analyzer")
    parser.add_argument("--log-file", required=True, help="Path to test results XML file")
    args = parser.parse_args()
    
    # Load test results
    test_results = load_test_results(args.log_file)
    analysis_results = {}
    
    # Process each test case
    for test_case in test_results.get('testsuite', {}).get('testcase', []):
        if 'failure' in test_case:
            test_name = test_case.get('@name', 'Unknown')
            analysis = analyze_failure(test_case)
            analysis_results[test_name] = analysis
    
    # Generate report
    if analysis_results:
        report_file = generate_report(test_results, analysis_results)
        print(f"Analysis report generated: {report_file}")
    else:
        print("No test failures found to analyze.")

if __name__ == "__main__":
    main() 